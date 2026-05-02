/* post-processed by ./scripts/process-types.go */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum UserRole {
  DefaultRole = "user",
  RoleUser = "user",
  RoleOwner = "owner",
}

export enum MaintenanceFilterStatus {
  MaintenanceFilterStatusScheduled = "scheduled",
  MaintenanceFilterStatusCompleted = "completed",
  MaintenanceFilterStatusBoth = "both",
}

export enum EntityPathType {
  EntityPathTypeLocation = "location",
  EntityPathTypeItem = "item",
}

export enum EntityfieldType {
  TypeText = "text",
  TypeNumber = "number",
  TypeBoolean = "boolean",
  TypeTime = "time",
}

export enum AuthrolesRole {
  DefaultRole = "user",
  RoleAdmin = "admin",
  RoleUser = "user",
  RoleAttachments = "attachments",
}

export enum AttachmentType {
  DefaultType = "attachment",
  TypePhoto = "photo",
  TypeManual = "manual",
  TypeWarranty = "warranty",
  TypeAttachment = "attachment",
  TypeReceipt = "receipt",
  TypeThumbnail = "thumbnail",
}

export interface CurrenciesCurrency {
  code: string;
  decimals: number;
  local: string;
  name: string;
  symbol: string;
}

export interface EntAttachment {
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the AttachmentQuery when eager-loading is set.
   */
  edges: EntAttachmentEdges;
  /** ID of the ent. */
  id: string;
  /** MimeType holds the value of the "mime_type" field. */
  mime_type: string;
  /** Path holds the value of the "path" field. */
  path: string;
  /** Primary holds the value of the "primary" field. */
  primary: boolean;
  /** Title holds the value of the "title" field. */
  title: string;
  /** Type holds the value of the "type" field. */
  type: AttachmentType;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntAttachmentEdges {
  /** Entity holds the value of the entity edge. */
  entity: EntEntity;
  /** Thumbnail holds the value of the thumbnail edge. */
  thumbnail: EntAttachment;
}

export interface EntAuthRoles {
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the AuthRolesQuery when eager-loading is set.
   */
  edges: EntAuthRolesEdges;
  /** ID of the ent. */
  id: number;
  /** Role holds the value of the "role" field. */
  role: AuthrolesRole;
}

export interface EntAuthRolesEdges {
  /** Token holds the value of the token edge. */
  token: EntAuthTokens;
}

export interface EntAuthTokens {
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the AuthTokensQuery when eager-loading is set.
   */
  edges: EntAuthTokensEdges;
  /** ExpiresAt holds the value of the "expires_at" field. */
  expires_at: string;
  /** ID of the ent. */
  id: string;
  /** Token holds the value of the "token" field. */
  token: number[];
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntAuthTokensEdges {
  /** Roles holds the value of the roles edge. */
  roles: EntAuthRoles;
  /** User holds the value of the user edge. */
  user: EntUser;
}

export interface EntEntity {
  /** Archived holds the value of the "archived" field. */
  archived: boolean;
  /** AssetID holds the value of the "asset_id" field. */
  asset_id: number;
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** Description holds the value of the "description" field. */
  description: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the EntityQuery when eager-loading is set.
   */
  edges: EntEntityEdges;
  /** ID of the ent. */
  id: string;
  /** ImportRef holds the value of the "import_ref" field. */
  import_ref: string;
  /** Insured holds the value of the "insured" field. */
  insured: boolean;
  /** Manufacturer holds the value of the "manufacturer" field. */
  manufacturer: string;
  /** ModelNumber holds the value of the "model_number" field. */
  model_number: string;
  /** Name holds the value of the "name" field. */
  name: string;
  /** Notes holds the value of the "notes" field. */
  notes: string;
  /** PurchaseDate holds the value of the "purchase_date" field. */
  purchase_date: Date | string;
  /** PurchaseFrom holds the value of the "purchase_from" field. */
  purchase_from: string;
  /** PurchasePrice holds the value of the "purchase_price" field. */
  purchase_price: number;
  /** Quantity holds the value of the "quantity" field. */
  quantity: number;
  /** SerialNumber holds the value of the "serial_number" field. */
  serial_number: string;
  /** SyncChildEntityLocations holds the value of the "sync_child_entity_locations" field. */
  sync_child_entity_locations: boolean;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntEntityEdges {
  /** Attachments holds the value of the attachments edge. */
  attachments: EntAttachment[];
  /** Children holds the value of the children edge. */
  children: EntEntity[];
  /** EntityType holds the value of the entity_type edge. */
  entity_type: EntEntityType;
  /** Fields holds the value of the fields edge. */
  fields: EntEntityField[];
  /** Group holds the value of the group edge. */
  group: EntGroup;
  /** MaintenanceEntries holds the value of the maintenance_entries edge. */
  maintenance_entries: EntMaintenanceEntry[];
  /** Parent holds the value of the parent edge. */
  parent: EntEntity;
  /** Tag holds the value of the tag edge. */
  tag: EntTag[];
}

export interface EntEntityField {
  /** BooleanValue holds the value of the "boolean_value" field. */
  boolean_value: boolean;
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** Description holds the value of the "description" field. */
  description: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the EntityFieldQuery when eager-loading is set.
   */
  edges: EntEntityFieldEdges;
  /** ID of the ent. */
  id: string;
  /** Name holds the value of the "name" field. */
  name: string;
  /** NumberValue holds the value of the "number_value" field. */
  number_value: number;
  /** TextValue holds the value of the "text_value" field. */
  text_value: string;
  /** TimeValue holds the value of the "time_value" field. */
  time_value: string;
  /** Type holds the value of the "type" field. */
  type: EntityfieldType;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntEntityFieldEdges {
  /** Entity holds the value of the entity edge. */
  entity: EntEntity;
}

export interface EntEntityType {
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** Description holds the value of the "description" field. */
  description: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the EntityTypeQuery when eager-loading is set.
   */
  edges: EntEntityTypeEdges;
  /** Icon holds the value of the "icon" field. */
  icon: string;
  /** ID of the ent. */
  id: string;
  /** IsLocation holds the value of the "is_location" field. */
  is_location: boolean;
  /** Name holds the value of the "name" field. */
  name: string;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntEntityTypeEdges {
  /** Entities holds the value of the entities edge. */
  entities: EntEntity[];
  /** Group holds the value of the group edge. */
  group: EntGroup;
}

export interface EntGroup {
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** Currency holds the value of the "currency" field. */
  currency: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the GroupQuery when eager-loading is set.
   */
  edges: EntGroupEdges;
  /** ID of the ent. */
  id: string;
  /** Name holds the value of the "name" field. */
  name: string;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntGroupEdges {
  /** Entities holds the value of the entities edge. */
  entities: EntEntity[];
  /** EntityTypes holds the value of the entity_types edge. */
  entity_types: EntEntityType[];
  /** InvitationTokens holds the value of the invitation_tokens edge. */
  invitation_tokens: EntGroupInvitationToken[];
  /** Notifiers holds the value of the notifiers edge. */
  notifiers: EntNotifier[];
  /** Tags holds the value of the tags edge. */
  tags: EntTag[];
  /** Users holds the value of the users edge. */
  users: EntUser[];
}

export interface EntGroupInvitationToken {
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the GroupInvitationTokenQuery when eager-loading is set.
   */
  edges: EntGroupInvitationTokenEdges;
  /** ExpiresAt holds the value of the "expires_at" field. */
  expires_at: string;
  /** ID of the ent. */
  id: string;
  /** Token holds the value of the "token" field. */
  token: number[];
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
  /** Uses holds the value of the "uses" field. */
  uses: number;
}

export interface EntGroupInvitationTokenEdges {
  /** Group holds the value of the group edge. */
  group: EntGroup;
}

export interface EntMaintenanceEntry {
  /** Cost holds the value of the "cost" field. */
  cost: number;
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** Date holds the value of the "date" field. */
  date: Date | string;
  /** Description holds the value of the "description" field. */
  description: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the MaintenanceEntryQuery when eager-loading is set.
   */
  edges: EntMaintenanceEntryEdges;
  /** EntityID holds the value of the "entity_id" field. */
  entity_id: string;
  /** ID of the ent. */
  id: string;
  /** Name holds the value of the "name" field. */
  name: string;
  /** ScheduledDate holds the value of the "scheduled_date" field. */
  scheduled_date: Date | string;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntMaintenanceEntryEdges {
  /** Entity holds the value of the entity edge. */
  entity: EntEntity;
}

export interface EntNotifier {
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the NotifierQuery when eager-loading is set.
   */
  edges: EntNotifierEdges;
  /** GroupID holds the value of the "group_id" field. */
  group_id: string;
  /** ID of the ent. */
  id: string;
  /** IsActive holds the value of the "is_active" field. */
  is_active: boolean;
  /** Name holds the value of the "name" field. */
  name: string;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
  /** UserID holds the value of the "user_id" field. */
  user_id: string;
}

export interface EntNotifierEdges {
  /** Group holds the value of the group edge. */
  group: EntGroup;
  /** User holds the value of the user edge. */
  user: EntUser;
}

export interface EntTag {
  /** Color holds the value of the "color" field. */
  color: string;
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** Description holds the value of the "description" field. */
  description: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the TagQuery when eager-loading is set.
   */
  edges: EntTagEdges;
  /** Icon holds the value of the "icon" field. */
  icon: string;
  /** ID of the ent. */
  id: string;
  /** Name holds the value of the "name" field. */
  name: string;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntTagEdges {
  /** Children holds the value of the children edge. */
  children: EntTag[];
  /** Entities holds the value of the entities edge. */
  entities: EntEntity[];
  /** Group holds the value of the group edge. */
  group: EntGroup;
  /** Parent holds the value of the parent edge. */
  parent: EntTag;
}

export interface EntUser {
  /** ActivatedOn holds the value of the "activated_on" field. */
  activated_on: string;
  /** CreatedAt holds the value of the "created_at" field. */
  created_at: string;
  /** DefaultGroupID holds the value of the "default_group_id" field. */
  default_group_id: string;
  /**
   * Edges holds the relations/edges for other nodes in the graph.
   * The values are being populated by the UserQuery when eager-loading is set.
   */
  edges: EntUserEdges;
  /** Email holds the value of the "email" field. */
  email: string;
  /** ID of the ent. */
  id: string;
  /** IsSuperuser holds the value of the "is_superuser" field. */
  is_superuser: boolean;
  /** Name holds the value of the "name" field. */
  name: string;
  /** OidcIssuer holds the value of the "oidc_issuer" field. */
  oidc_issuer: string;
  /** OidcSubject holds the value of the "oidc_subject" field. */
  oidc_subject: string;
  /** Role holds the value of the "role" field. */
  role: UserRole;
  /** Settings holds the value of the "settings" field. */
  settings: Record<string, any>;
  /** Superuser holds the value of the "superuser" field. */
  superuser: boolean;
  /** UpdatedAt holds the value of the "updated_at" field. */
  updated_at: string;
}

export interface EntUserEdges {
  /** AuthTokens holds the value of the auth_tokens edge. */
  auth_tokens: EntAuthTokens[];
  /** Groups holds the value of the groups edge. */
  groups: EntGroup[];
  /** Notifiers holds the value of the notifiers edge. */
  notifiers: EntNotifier[];
}

export interface BarcodeProduct {
  barcode: string;
  imageBase64: string;
  imageURL: string;
  item: EntityCreate;
  manufacturer: string;
  /** Identifications */
  modelNumber: string;
  /** Extras */
  notes: string;
  search_engine_name: string;
}

export interface DuplicateOptions {
  copyAttachments: boolean;
  copyCustomFields: boolean;
  copyMaintenance: boolean;
  copyPrefix: string;
}

export interface EntityCreate {
  /** @maxLength 1000 */
  description: string;
  entityTypeId: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  parentId?: string | null;
  quantity: number;
  /** Edges */
  tagIds: string[];
}

export interface EntityFieldData {
  booleanValue: boolean;
  id: string;
  name: string;
  numberValue: number;
  textValue: string;
  type: string;
}

export interface EntityListResult {
  items: EntitySummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPrice: number;
}

export interface EntityOut {
  archived: boolean;
  /** @example "0" */
  assetId: string;
  attachments: ItemAttachment[];
  /** Container-specific fields (for entities whose entity_type.is_location = true) */
  children: EntitySummary[];
  createdAt: Date | string;
  description: string;
  /** Status: none | pending | keep | sell | return | donate */
  status: string;
  entityType?: EntityTypeSummary | null;
  fields: EntityFieldData[];
  id: string;
  imageId?: string | null;
  insured: boolean;
  /** Container-specific (populated when querying locations) */
  itemCount: number;
  manufacturer: string;
  modelNumber: string;
  name: string;
  /** Extras */
  notes: string;
  /** Edges */
  parent?: EntitySummary | null;
  /** Purchase */
  purchaseDate: Date | string;
  purchaseFrom: string;
  purchasePrice: number;
  quantity: number;
  serialNumber: string;
  syncChildEntityLocations: boolean;
  tags: TagSummary[];
  thumbnailId?: string | null;
  totalPrice: number;
  updatedAt: Date | string;
}

export interface EntityPatch {
  entityTypeId?: string | null;
  id: string;
  parentId?: string | null;
  quantity?: number | null;
  tagIds?: string[] | null;
}

export interface EntityPath {
  id: string;
  name: string;
  type: EntityPathType;
}

export interface EntitySummary {
  archived: boolean;
  /** @example "0" */
  assetId: string;
  createdAt: Date | string;
  description: string;
  /** Status: none | pending | keep | sell | return | donate */
  status: string;
  entityType?: EntityTypeSummary | null;
  id: string;
  imageId?: string | null;
  insured: boolean;
  /** Container-specific (populated when querying locations) */
  itemCount: number;
  name: string;
  /** Edges */
  parent?: EntitySummary | null;
  purchasePrice: number;
  quantity: number;
  tags: TagSummary[];
  thumbnailId?: string | null;
  updatedAt: Date | string;
}

export interface EntityTypeCreate {
  icon: string;
  isLocation: boolean;
  name: string;
}

export interface EntityTypeSummary {
  createdAt: Date | string;
  description: string;
  icon: string;
  id: string;
  isLocation: boolean;
  name: string;
  updatedAt: Date | string;
}

export interface EntityTypeUpdate {
  icon: string;
  id: string;
  isLocation: boolean;
  name: string;
}

export interface EntityUpdate {
  archived: boolean;
  assetId: string;
  /** @maxLength 1000 */
  description: string;
  /** Status: none | pending | keep | sell | return | donate */
  status: string;
  entityTypeId: string;
  fields: EntityFieldData[];
  id: string;
  insured: boolean;
  manufacturer: string;
  modelNumber: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /** Extras */
  notes: string;
  parentId?: string | null;
  /** Purchase */
  purchaseDate: Date | string;
  /** @maxLength 255 */
  purchaseFrom: string;
  purchasePrice?: number | null;
  quantity: number;
  /** Identifications */
  serialNumber: string;
  syncChildEntityLocations: boolean;
  /** Edges */
  tagIds: string[];
}

export interface Group {
  createdAt: Date | string;
  currency: string;
  id: string;
  name: string;
  updatedAt: Date | string;
}

export interface GroupInvitation {
  expiresAt: Date | string;
  group: Group;
  id: string;
  uses: number;
}

export interface GroupStatistics {
  totalItemPrice: number;
  totalItems: number;
  totalLocations: number;
  totalTags: number;
  totalUsers: number;
  totalWithWarranty: number;
}

export interface GroupUpdate {
  currency: string;
  name: string;
}

export interface ItemAttachment {
  createdAt: Date | string;
  id: string;
  mimeType: string;
  path: string;
  primary: boolean;
  thumbnail: EntAttachment;
  title: string;
  type: string;
  updatedAt: Date | string;
}

export interface ItemAttachmentUpdate {
  primary: boolean;
  title: string;
  type: string;
}

export interface MaintenanceEntry {
  completedDate: Date | string;
  /** @example "0" */
  cost: string;
  description: string;
  id: string;
  name: string;
  scheduledDate: Date | string;
}

export interface MaintenanceEntryCreate {
  completedDate: Date | string;
  /** @example "0" */
  cost: string;
  description: string;
  name: string;
  scheduledDate: Date | string;
}

export interface MaintenanceEntryUpdate {
  completedDate: Date | string;
  /** @example "0" */
  cost: string;
  description: string;
  name: string;
  scheduledDate: Date | string;
}

export interface MaintenanceEntryWithDetails {
  completedDate: Date | string;
  /** @example "0" */
  cost: string;
  description: string;
  id: string;
  itemID: string;
  itemName: string;
  name: string;
  scheduledDate: Date | string;
}

export interface NotifierCreate {
  isActive: boolean;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  url: string;
}

export interface NotifierOut {
  createdAt: Date | string;
  groupId: string;
  id: string;
  isActive: boolean;
  name: string;
  updatedAt: Date | string;
  url: string;
  userId: string;
}

export interface NotifierUpdate {
  isActive: boolean;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  url?: string | null;
}

export interface PaginationResultEntitySummary {
  items: EntitySummary[];
  page: number;
  pageSize: number;
  total: number;
}

export interface TagCreate {
  color: string;
  /** @maxLength 1000 */
  description: string;
  /** @maxLength 255 */
  icon: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  parentId?: string | null;
}

export interface TagOut {
  children: TagSummary[];
  color: string;
  createdAt: Date | string;
  description: string;
  icon: string;
  id: string;
  name: string;
  parent?: TagSummary | null;
  parentId?: string | null;
  updatedAt: Date | string;
}

export interface TagSummary {
  color: string;
  createdAt: Date | string;
  description: string;
  icon: string;
  id: string;
  name: string;
  parentId?: string | null;
  updatedAt: Date | string;
}

export interface TagUpdate {
  color: string;
  /** @maxLength 1000 */
  description: string;
  /** @maxLength 255 */
  icon: string;
  id: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  parentId?: string | null;
}

export interface TotalsByOrganizer {
  id: string;
  name: string;
  total: number;
}

export interface TreeItem {
  children: TreeItem[];
  id: string;
  name: string;
  type: string;
}

export interface UserOut {
  defaultGroupId: string;
  email: string;
  groupIds: string[];
  id: string;
  isOwner: boolean;
  isSuperuser: boolean;
  name: string;
  oidcIssuer: string;
  oidcSubject: string;
}

export interface UserSummary {
  email: string;
  id: string;
  isOwner: boolean;
  name: string;
}

export interface UserUpdate {
  email: string;
  name: string;
}

export interface ValueOverTime {
  end: string;
  entries: ValueOverTimeEntry[];
  start: string;
  valueAtEnd: number;
  valueAtStart: number;
}

export interface ValueOverTimeEntry {
  date: Date | string;
  name: string;
  value: number;
}

export interface Latest {
  date: Date | string;
  version: string;
}

export interface UserRegistration {
  email: string;
  name: string;
  password: string;
  token: string;
}

export interface APISummary {
  allowRegistration: boolean;
  build: Build;
  demo: boolean;
  health: boolean;
  labelPrinting: boolean;
  latest: Latest;
  message: string;
  oidc: OIDCStatus;
  telemetry: TelemetryStatus;
  title: string;
  versions: string[];
}

export interface ActionAmountResult {
  completed: number;
}

export interface Build {
  buildTime: string;
  commit: string;
  version: string;
}

export interface ChangePassword {
  current: string;
  new: string;
}

export interface CreateRequest {
  name: string;
}

export interface GroupAcceptInvitationResponse {
  id: string;
  name: string;
}

export interface GroupInvitation {
  expiresAt: Date | string;
  id: string;
  token: string;
  uses: number;
}

export interface GroupInvitationCreate {
  expiresAt: Date | string;
  /**
   * @min 1
   * @max 100
   */
  uses: number;
}

export interface GroupMemberAdd {
  userId: string;
}

export interface LoginForm {
  /** @example "admin" */
  password: string;
  stayLoggedIn: boolean;
  /** @example "admin@admin.com" */
  username: string;
}

export interface OIDCStatus {
  allowLocal: boolean;
  autoRedirect: boolean;
  buttonText: string;
  enabled: boolean;
}

export interface TelemetryStatus {
  enabled: boolean;
}

export interface TokenResponse {
  attachmentToken: string;
  expiresAt: Date | string;
  token: string;
}

export interface WipeInventoryOptions {
  wipeLocations: boolean;
  wipeMaintenance: boolean;
  wipeTags: boolean;
}

export interface Wrapped {
  item: any;
}

export interface ValidateErrorResponse {
  error: string;
  fields: string;
}
