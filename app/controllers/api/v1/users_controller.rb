class Api::V1::UsersController < ApiController
  def show
    render json: { user_id: current_user.id }
  end
end
