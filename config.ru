$LOAD_PATH.unshift(File.expand_path("../app", __FILE__))

require "kana_bingo"

run KanaBingo::Server
