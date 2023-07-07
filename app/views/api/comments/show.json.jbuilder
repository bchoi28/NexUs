json.comment do
    json.set! @comment.id do
        json.extract! @comment, :id, :content, :created_at, :updated_at
        json.commenter do
            json.id @comment.commenter.id
            json.fName @comment.commenter.fname
            json.lName @comment.commenter.lname
            json.headline @comment.commenter.headline
            json.pronouns @comment.commenter.pronouns
            json.photoUrl @comment.commenter.photo.url
        end
    end
end