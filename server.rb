require 'rubygems'
require 'sinatra'

set :root, File.dirname(__FILE__)

get '/' do
  send_file File.join(settings.public_folder, 'game.html')
end

get '/manifest' do
  content_type 'application/x-web-app-manifest+json'

  send_file File.join(settings.public_folder, 'manifest.txt')
end

get '/about' do
  'author: alex.korsak@gmail.com'
end
