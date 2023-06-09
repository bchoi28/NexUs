# == Schema Information
#
# Table name: users
#
#  id                      :bigint           not null, primary key
#  email                   :string           not null
#  fname                   :string           not null
#  lname                   :string           not null
#  profile_url             :string
#  headline                :string
#  pronouns                :string
#  about                   :text
#  location_country_region :string
#  location_postal_code    :string
#  location_city           :string
#  session_token           :string           not null
#  password_digest         :string           not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#

require 'open-uri'


class User < ApplicationRecord
    has_secure_password
    before_validation :generate_default_pic, :generate_default_cover_photo

    validates :email, 
        uniqueness: { message: 'Someone\'s already using that email.' },
        length: { in: 6..255, message: 'Email must be 6 characters or more' },
        format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Please enter a valid email address.' }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    # validates :fname, :lname, :location_country_region, :location_city, presence: true
    # validates :profile_url, uniqueness: true
  
    before_validation :ensure_session_token

    #   come back to flesh these associations out

    has_one_attached :photo
    has_one_attached :cover_photo


    has_many :posts, 
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Post,
        dependent: :destroy

    has_many :experiences,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Experience,
        dependent: :destroy
        
    has_many :likes,
        dependent: :destroy

    has_many :comments,
        dependent: :destroy
        
    has_many :connections
    has_many :connection_requests


    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user&.authenticate(password)
        # nil
    end

    def self.login_errors(params) 
        errors = {
            email: nil,
            password: nil
        }
        email = params[:email]
        password = params[:password]

        # email check
        if email.empty?
            errors[:email] = 'Please enter an email address'
        elsif email && !email.match(URI::MailTo::EMAIL_REGEXP)
            errors[:email] = 'Please enter a valid email address'
        end

        # password check
        if password&.empty?
            errors[:password] = 'Please enter a password'
        elsif password && password.length < 6
            errors[:password] = 'The password you provided must have at least 6 characters.'
        end
        
        if errors.values.all?(nil)
            if User.find_by(email: email)
                errors[:password] =  'That\'s not the right password. Please try again.'
            else
                errors[:email] = 'Couldn\'t find a NexUs account associated with this email. Please try again.'
            end
        end

        # returns an array of values => ex.['error', nil]
        return errors.values
    end

    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end

    def generate_default_pic
        unless self.photo.attached?
            file = URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/default-profile-image-circle.png");
            self.photo.attach(io: file, filename: "default-profile-image-circle.png")
        end
    end

    def generate_default_cover_photo
        unless self.cover_photo.attached?
            file = URI.open("https://nexus-seeds.s3.amazonaws.com/nexus-images/badge-background.png")
            self.cover_photo.attach(io: file, filename: "badge-background.png")
        end
    end

    private

    def generate_unique_session_token
        loop do
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
