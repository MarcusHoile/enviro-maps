EnviroMaps::Application.routes.draw do
  devise_for :users

  resources :issues do
  	resources :assets, shallow: true#, path: 'images'
  end

  
  resources :users do
  	resources :issues, shallow: true
  end



  root to: "issues#index"
end
