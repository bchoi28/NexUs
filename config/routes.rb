Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy] do
      resources :posts, only: :index
      collection do
        get 'search', to: 'users#search'
      end
      member do
        get 'fetch_user_connections', to: 'connections#fetch_user_connections'
      end
    end
    resources :posts, only: [:create, :index, :show, :update, :destroy] do
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :index, :show, :update, :destroy]
    end
    resources :experiences, only: [:create, :index, :show, :update, :destroy]
    resources :educations, only: [:create, :index, :show, :update, :destroy]
    resources :connections, only: [:create, :index, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]

    get 'users/:user_id/other_users', to: 'users#other_users', as: 'other_users'
    get 'connections/fetch_user_connections_connected_pending', to: 'connections#fetch_user_connections_connected_pending', as: 'fetch_user_connections_connected_pending'
  end

  get '*path', to: "static_pages#frontend_index"

end
