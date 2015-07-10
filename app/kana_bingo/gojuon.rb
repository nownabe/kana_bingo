module KanaBingo
  module Gojuon
    TABLE = [
      ["あ行", %w(あ い う え お)],
      ["か行", %w(か き く け こ)],
      ["さ行", %w(さ し す せ そ)],
      ["た行", %w(た ち つ て と)],
      ["な行", %w(な に ぬ ね の)],
      ["は行", %w(は ひ ふ へ ほ)],
      ["ま行", %w(ま み む め も)],
      ["や行", %w(や い ゆ え よ)],
      ["わ行", %w(わ ゐ う ゑ を)],
      ["ん行", %w(ん)]
    ]

    INITIAL_STATES =
      TABLE.each_with_object({}) do |(row_name, chars), states|
        states[row_name] =
          chars.each_with_object({}) { |char, h| h[char] = false }
      end

    DICTIONARY =
      TABLE.each_with_object({}) do |(row_name, chars), dictionary|
        chars.each { |char| dictionary[char] = row_name }
      end
  end
end
