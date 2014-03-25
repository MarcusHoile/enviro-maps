EnviroMaps::Application.routes.draw do
  devise_for :users
  resources :users do
  	resources :issues, shallow: true
  end

  root to: "issues#index"
end
