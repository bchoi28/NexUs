json.like do
    json.set! @like.id do
        json.likerId @like.user_id
        json.liker do
            json.id @like.user_id
            json.fName @like.user.fname
            json.lName @like.user.lname
            json.headline @like.user.headline
            json.pronouns @like.user.pronouns
            json.photoUrl @like.user.photo.url
        end
    end
end
