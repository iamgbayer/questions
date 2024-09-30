/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateItemInput = {
  currency: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  listId?: InputMaybe<Scalars['ID']['input']>;
  price: Scalars['Float']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  store: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type DeleteItemInput = {
  id: Scalars['ID']['input'];
};

export type Item = {
  __typename?: 'Item';
  bought: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  labels?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  listId?: Maybe<Scalars['ID']['output']>;
  ownerId: Scalars['ID']['output'];
  price: Price;
  priority?: Maybe<Scalars['Int']['output']>;
  product: Product;
  purchaseDate?: Maybe<Scalars['DateTime']['output']>;
  store: Store;
  url?: Maybe<Scalars['String']['output']>;
};

export type ItemDetailsOutput = {
  __typename?: 'ItemDetailsOutput';
  item: Item;
};

export type List = {
  __typename?: 'List';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  ownerId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem?: Maybe<Item>;
  createList?: Maybe<List>;
  deleteItem?: Maybe<Scalars['ID']['output']>;
  onboarding?: Maybe<User>;
  signup?: Maybe<User>;
  updateItem?: Maybe<Item>;
  updateItemDescription?: Maybe<Item>;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateListArgs = {
  input: CreateListInput;
};


export type MutationDeleteItemArgs = {
  input: DeleteItemInput;
};


export type MutationOnboardingArgs = {
  input: OnboardingInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationUpdateItemDescriptionArgs = {
  input: UpdateItemDescriptionInput;
};

export type OnboardingInput = {
  language: Scalars['String']['input'];
  location: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Price = {
  __typename?: 'Price';
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  value: Scalars['Float']['output'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProductDetails = {
  __typename?: 'ProductDetails';
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  store?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ProfileOutput = {
  __typename?: 'ProfileOutput';
  items: Array<Maybe<Item>>;
  lists: Array<Maybe<List>>;
  total: Scalars['Float']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getItemDetailsById?: Maybe<ItemDetailsOutput>;
  getItems?: Maybe<Array<Maybe<Item>>>;
  getLists?: Maybe<Array<Maybe<List>>>;
  getProductByUrl?: Maybe<Array<Maybe<ProductDetails>>>;
  getProfile?: Maybe<ProfileOutput>;
};


export type QueryGetItemDetailsByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetItemsArgs = {
  listId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetProductByUrlArgs = {
  url: Scalars['String']['input'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
};

export type Store = {
  __typename?: 'Store';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpdateItemDescriptionInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateItemInput = {
  bought?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  labels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  purchaseDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  language?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  onboarded: Scalars['Boolean']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};
