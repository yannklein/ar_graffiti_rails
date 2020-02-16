class AddAngleToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :angle, :integer
    add_column :messages, :size, :integer
  end
end
