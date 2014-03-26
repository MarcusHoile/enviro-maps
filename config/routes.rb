EnviroMaps::Application.routes.draw do
  devise_for :users

  resources :issues do
  	resources :assets, shallow: true
  end
  
  resources :users do
  	resources :issues, shallow: true
  end



  root to: "issues#index"
end
