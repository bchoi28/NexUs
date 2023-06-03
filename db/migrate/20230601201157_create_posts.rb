class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.text :body, null: false
      t.string :image_url
      t.timestamps
    end
  end
end
