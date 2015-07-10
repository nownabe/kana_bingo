require "forwardable"
require "leveldb"
require "singleton"

module KanaBingo
  class Db
    include Singleton
    extend Forwardable

    DB_PATH = "states.db"

    attr_reader :db_path

    def initialize(db_path = DB_PATH)
      @db_path ||= db_path
      @db = LevelDB::DB.new(db_path)
    end

    def_delegator :@db, :fetch, :fetch
    def_delegator :@db, :put, :put
  end
end
