class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, index: {unique: true}
      t.string :fname
      t.string :lname
      t.string :image_url
      t.string :profile_url, index: {unique: true}
      t.string :headline
      t.string :pronouns
      t.text :about
      t.string :location_country_region
      t.string :location_postal_code
      t.string :location_city
      t.string :session_token, null: false, index: {unique: true}
      t.string :password_digest, null: false

      t.timestamps
    end

  end
end
