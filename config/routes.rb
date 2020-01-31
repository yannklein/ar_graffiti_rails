Rails.application.routes.draw do
  root to: 'pages#home'
  get "/live", to: "pages#live", as: :live
  get '/pattern.:format' => 'pages#pattern'
  
  resources :chat_rooms, only: [ :show ] do
    resources :messages, only: [ :create ]
  end
  mount ActionCable.server => "/cable"
end
