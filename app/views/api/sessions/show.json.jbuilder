json.user do
  json.extract! @user, :id, :email, :headline, :pronouns, :about, :location_country_region, :location_postal_code, :location_city, :created_at, :updated_at
  json.set! :fName, @user.fname
  json.set! :lName, @user.lname
end