class CreateExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :experiences do |t|
      t.string :title
      t.string :employment_type
      t.string :company_name
      t.string :location
      t.string :location_type
      t.date :start_date
      t.date :end_date
      t.string :industry
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
