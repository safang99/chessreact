Rails.application.routes.draw do
  root 'homes#index'
  get '/local', to: 'homes#index'
  get '/online/:id', to: 'homes#index'

  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
      get "users/current", to: "users#current_user"
    end
  end

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
