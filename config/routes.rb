EnviroMaps::Application.routes.draw do
  devise_for :users
  resources :users
  resources :issues

  root to: "issues#index"
end
