class RemoveTypeFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :type, :string
  end
end
