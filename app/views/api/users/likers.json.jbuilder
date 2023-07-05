json.user do
  json.extract! @user, :id, :headline, :pronouns
  json.photoUrl @user.photo.attached? ? @user.photo.url : nil
  json.set! :fName, @user.fname
  json.set! :lName, @user.lname
end  