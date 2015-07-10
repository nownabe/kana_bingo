module KanaBingo
  Error = Class.new(StandardError)
  InvalidCharacter = Class.new(KanaBingo::Error)
end

require "kana_bingo/db"
require "kana_bingo/gojuon"
require "kana_bingo/server"
require "kana_bingo/states"
