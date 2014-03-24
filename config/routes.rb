EnviroMaps::Application.routes.draw do
  devise_for :users
  resources :users

  root to: "markers#index"
end
