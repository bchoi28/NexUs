json.posts do
    json.array! @posts do |post|
        json.extract! post, :id, :body, :author_id, :image_url, :created_at, :updated_at
        json.author do
            json.fName post.author.fname
            json.lName post.author.lname
            json.imageURL post.author.image_url
            json.pronouns post.author.pronouns
            json.headline post.author.headline
        end
    end
end