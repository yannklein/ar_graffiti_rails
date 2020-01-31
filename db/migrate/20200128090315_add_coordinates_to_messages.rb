class AddCoordinatesToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :startX, :float
    add_column :messages, :startY, :float
    add_column :messages, :endX, :float
    add_column :messages, :endY, :float
  end
end
