class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :likeable, polymorphic: true, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :likes, [:likeable_type, :likeable_id]
  end
end
