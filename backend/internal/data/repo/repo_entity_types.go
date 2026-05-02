package repo

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/samber/lo"
	"github.com/sysadminsmedia/homebox/backend/internal/core/services/reporting/eventbus"
	"github.com/sysadminsmedia/homebox/backend/internal/data/ent"
	"github.com/sysadminsmedia/homebox/backend/internal/data/ent/entitytype"
	"github.com/sysadminsmedia/homebox/backend/internal/data/ent/group"
)

type EntityTypeRepository struct {
	db  *ent.Client
	bus *eventbus.EventBus
}

type (
	EntityTypeCreate struct {
		Name       string `json:"name"`
		IsLocation bool   `json:"isLocation"`
		Icon       string `json:"icon"`
	}

	EntityTypeUpdate struct {
		ID         uuid.UUID `json:"id"`
		Name       string    `json:"name"`
		IsLocation bool      `json:"isLocation"`
		Icon       string    `json:"icon"`
	}

	EntityTypeSummary struct {
		ID          uuid.UUID `json:"id"`
		Name        string    `json:"name"`
		Description string    `json:"description"`
		IsLocation  bool      `json:"isLocation"`
		Icon        string    `json:"icon"`
		CreatedAt   time.Time `json:"createdAt"`
		UpdatedAt   time.Time `json:"updatedAt"`
	}
)

func mapEntityTypeSummary(et *ent.EntityType) EntityTypeSummary {
	return EntityTypeSummary{
		ID:          et.ID,
		Name:        et.Name,
		Description: et.Description,
		IsLocation:  et.IsLocation,
		Icon:        et.Icon,
		CreatedAt:   et.CreatedAt,
		UpdatedAt:   et.UpdatedAt,
	}
}

func (r *EntityTypeRepository) publishMutationEvent(gid uuid.UUID) {
	if r.bus != nil {
		r.bus.Publish(eventbus.EventEntityMutation, eventbus.GroupMutationEvent{GID: gid})
	}
}

// GetAll returns all entity types for a group.
func (r *EntityTypeRepository) GetAll(ctx context.Context, gid uuid.UUID) ([]EntityTypeSummary, error) {
	types, err := r.db.EntityType.Query().
		Where(entitytype.HasGroupWith(group.ID(gid))).
		Order(entitytype.ByName()).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return lo.Map(types, func(et *ent.EntityType, _ int) EntityTypeSummary {
		return mapEntityTypeSummary(et)
	}), nil
}

// Create creates a new entity type for a group.
func (r *EntityTypeRepository) Create(ctx context.Context, gid uuid.UUID, data EntityTypeCreate) (EntityTypeSummary, error) {
	et, err := r.db.EntityType.Create().
		SetName(data.Name).
		SetIsLocation(data.IsLocation).
		SetIcon(data.Icon).
		SetGroupID(gid).
		Save(ctx)
	if err != nil {
		return EntityTypeSummary{}, err
	}

	r.publishMutationEvent(gid)
	return mapEntityTypeSummary(et), nil
}

// Update updates an existing entity type.
func (r *EntityTypeRepository) Update(ctx context.Context, gid uuid.UUID, data EntityTypeUpdate) (EntityTypeSummary, error) {
	_, err := r.db.EntityType.Update().
		Where(
			entitytype.ID(data.ID),
			entitytype.HasGroupWith(group.ID(gid)),
		).
		SetName(data.Name).
		SetIsLocation(data.IsLocation).
		SetIcon(data.Icon).
		Save(ctx)
	if err != nil {
		return EntityTypeSummary{}, err
	}

	et, err := r.db.EntityType.Query().
		Where(entitytype.ID(data.ID)).
		Only(ctx)
	if err != nil {
		return EntityTypeSummary{}, err
	}

	r.publishMutationEvent(gid)
	return mapEntityTypeSummary(et), nil
}

// Delete deletes an entity type by ID, verified to belong to the specified group.
func (r *EntityTypeRepository) Delete(ctx context.Context, gid uuid.UUID, id uuid.UUID) error {
	_, err := r.db.EntityType.Delete().
		Where(
			entitytype.ID(id),
			entitytype.HasGroupWith(group.ID(gid)),
		).Exec(ctx)
	if err != nil {
		return err
	}

	r.publishMutationEvent(gid)
	return nil
}

// GetDefault returns the first entity type matching the isLocation flag for the group.
// If none exists, it creates a default one.
func (r *EntityTypeRepository) GetDefault(ctx context.Context, gid uuid.UUID, isLocation bool) (EntityTypeSummary, error) {
	et, err := r.db.EntityType.Query().
		Where(
			entitytype.HasGroupWith(group.ID(gid)),
			entitytype.IsLocation(isLocation),
		).
		Order(entitytype.ByCreatedAt()).
		First(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			// Create a default entity type
			name := "Item"
			if isLocation {
				name = "Location"
			}
			return r.Create(ctx, gid, EntityTypeCreate{
				Name:       name,
				IsLocation: isLocation,
			})
		}
		return EntityTypeSummary{}, err
	}

	return mapEntityTypeSummary(et), nil
}
