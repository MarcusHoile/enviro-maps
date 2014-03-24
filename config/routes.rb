EnviroMaps::Application.routes.draw do
  devise_for :users
  resources :users
  resources :markers

  root to: "markers#index"
end
