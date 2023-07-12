json.user do
  json.extract! @user, :id, :email, :headline, :pronouns, :about, :location_country_region, :location_postal_code, :location_city, :created_at, :updated_at
  json.photoUrl @user.photo.attached? ? @user.photo.url : nil
  json.coverPhotoUrl @user.cover_photo.attached? ? @user.cover_photo.url : nil
  json.set! :fName, @user.fname
  json.set! :lName, @user.lname
  json.experiences do 
    @user.experiences.each do |experience|
      json.set! experience.id do
        json.id experience.id
        json.title experience.title
        json.employmentType experience.employment_type
        json.companyName experience.company_name
        json.location experience.location
        json.locationType experience.location_type
        json.startDate experience.start_date
        json.endDate experience.end_date
        json.description experience.description
      end
    end
  end
end 