require "json"

module KanaBingo
  class States
    attr_reader :id, :json

    def initialize(id)
      @id = id
      @json = db.fetch(id, initial_states)
    end

    def close(char)
      validate_character!(char)
      states[row(char)][char] = false
      save!
    end

    def db
      @db ||= Db.instance
    end

    def initial_states
      Gojuon::INITIAL_STATES.to_json
    end

    def open(char)
      validate_character!(char)
      states[row(char)][char] = true
      save!
    end

    def row(char)
      Gojuon::DICTIONARY[char]
    end

    def save!
      @json = states.to_json
      db.put(id, json)
    end

    def states
      @states ||= JSON.parse(@json)
    end

    def validate_character!(char)
      fail(InvalidCharacter) unless Gojuon::DICTIONARY.key?(char)
    end
  end
end
