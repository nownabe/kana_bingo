require "sinatra/base"

module KanaBingo
  class Server < Sinatra::Base
    get "/" do
      "test"
    end
  end
end
