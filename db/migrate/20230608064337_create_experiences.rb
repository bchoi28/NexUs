class CreateExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :experiences do |t|
      t.string :title
      t.string :employment_type
      t.string :company_name
      t.string :location
      t.string :location_type
      t.string :start_month
      t.string :start_year
      t.string :end_month
      t.string :end_year
      t.string :industry
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
