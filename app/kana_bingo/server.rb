require "json"
require "sinatra/base"
require "slim"
require "uri"

module KanaBingo
  class Server < Sinatra::Base
    set :views, File.expand_path("../../views", __FILE__)
    set :public_folder, File.expand_path("../../../public", __FILE__)

    get "/:id.?:format?" do
      case params[:format]
      when "json"
        states.json
      else
        slim :index, format: :html
      end
    end

    post "/:id/:char" do
      begin
        states.open(params[:char])
        success
      rescue InvalidCharacter
        error(404, invalid_character_message)
      rescue
        error(500, "Unexpected error")
      end
    end

    delete "/:id/:char" do
      begin
        states.close(params[:char])
        success
      rescue InvalidCharacter
        error(404, invalid_character_message)
      rescue
        error(500, "Unexpected error")
      end
    end

    def error(code, message)
      status code
      { success: false, error: message }.to_json
    end

    def invalid_character_message
      "Invalid character `#{params[:char]}`"
    end

    def states
      @states ||= States.new(params[:id])
    end

    def success
      { success: true }.to_json
    end
  end
end
