json.experience do
    debugger
    json.set! @experience.id do
        json.id @experience.id
        json.title @experience.title
        json.employmentType @experience.employment_type
        json.companyName @experience.company_name
        json.location @experience.location
        json.locationType @experience.location_type
        json.industry @experience.industry
        json.startDate @experience.start_date
        json.endDate @experience.end_date
        json.description @experience.description
    end
end