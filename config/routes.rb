Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update] do
      resources :posts, only: :index
      resources :experiences, only: [:create, :index, :show, :update, :destroy]
      collection do
        get 'search', to: 'users#search'
      end
    end
    resources :posts, only: [:create, :index, :show, :update, :destroy] do
      resources :likes, only: [:create, :destroy]
    end
    resources :experiences, only: [:create, :index, :show, :update, :destroy]
    resources :educations, only: [:create, :index, :show, :update, :destroy]
    resources :comments, only: [:create, :index, :show, :update, :destroy]
    resources :likes, only: [:create, :index, :show, :destroy]
    

    resource :session, only: [:show, :create, :destroy]

end

  get '*path', to: "static_pages#frontend_index"

end
