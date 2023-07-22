json.connections do
    if @connected_users.length > 0
        @connected_users.each do |user|
            json.set! user.id do
                json.user do
                    json.id user.id
                    json.fName user.fname
                    json.lName user.lname
                    json.photoUrl user.photo.attached? ? user.photo.url : nil
                    json.coverPhotoUrl user.cover_photo.attached? ? user.cover_photo.url : nil
                    json.headline user.headline
                    json.pronouns user.pronouns
                    json.location "#{user.location_country_region}, #{user.location_city}"
                end
            end
        end
    else
        json.array! []
    end
end
