json.array! @users do |user|
    json.id user.id
    json.fName user.fname
    json.lName user.lname
    json.headline user.headline
end