json.post do
  json.extract! @post, :id, :author_id, :body, :image_url, :created_at, :updated_at
  json.author do
    json.authorId @post.author.id
    json.fName @post.author.fname
    json.lName @post.author.lname
    json.imageURL @post.author.image_url
    json.pronouns @post.author.pronouns
    json.headline @post.author.headline
  end
end