class CreateConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :connections do |t|
      t.references :connector, null: false, foreign_key: {to_table: :users}
      t.references :connectee, null: false, foreign_key: {to_table: :users}
      t.string :status, null: false
      t.timestamps
    end
  end
end
