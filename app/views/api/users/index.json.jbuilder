json.users do
  json.array! @users do |user|
    json.id user.id
    json.headline user.headline
    json.pronouns user.pronouns
    json.fName user.fname
    json.lName user.lname
    json.location "#{user.location_country_region}, #{user.location_city}"
    json.photoUrl user.photo.attached? ? user.photo.url : nil
  end
end
