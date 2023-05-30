class User < ApplicationRecord
  has_secure_password

  validates :email, 
    uniqueness: { message: 'is already taken' },
    length: { in: 6..255, message: 'must be between 6 and 255 characters' },
    format: { with: URI::MailTo::EMAIL_REGEXP, message: 'is not a valid email address' }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :fname, :lname, :location_country_region, :location_city, presence: true
  validates :profile_url, uniqueness: true
  
  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
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
