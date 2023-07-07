json.like do
    json.set! @like.id do
        json.likerId @like.liker_id
        json.liker do
            json.id @like.liker_id
            json.fName @like.liker.fname
            json.lName @like.liker.lname
            json.headline @like.liker.headline
            json.pronouns @like.liker.pronouns
            json.photoUrl @like.liker.photo.url
        end
    end
end
