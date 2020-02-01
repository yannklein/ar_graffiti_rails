class AddColorToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :color, :string
  end
end
