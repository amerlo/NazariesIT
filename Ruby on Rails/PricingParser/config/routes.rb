Rails.application.routes.draw do
  get 'pricing_parser/index'

  root 'pricing_parser#index'
end
