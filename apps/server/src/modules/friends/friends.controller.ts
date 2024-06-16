import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/auth.jwt.guard';
import { AuthRequest } from '@/interfaces/authenticate-request.interface';
import { FriendsService } from './friends.service';

@UseGuards(JwtGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  getAllFriends(@Req() req: AuthRequest) {
    return this.friendsService.getAllFriends(req.user.id);
  }

  @Post('request')
  sendFriendRequest(
    @Req() req: AuthRequest,
    @Body('targetUserId') targetUserId: number,
  ) {
    return this.friendsService.sendFriendRequest(req.user.id, targetUserId);
  }

  @Get('request/sent')
  getSentRequests(@Req() req: AuthRequest) {
    return this.friendsService.getSentRequests(req.user.id);
  }

  @Get('/request')
  getRequests(@Req() req: AuthRequest) {
    return this.friendsService.getRequests(req.user.id);
  }

  @Post('/reject')
  rejectRequest(
    @Req() req: AuthRequest,
    @Body('targetUserId') targetUserId: number,
  ) {
    return this.friendsService.rejectRequest(req.user.id, targetUserId);
  }

  @Post('/accept')
  acceptRequest(
    @Req() req: AuthRequest,
    @Body('targetUserId') targetUserId: number,
  ) {
    return this.friendsService.acceptRequest(req.user.id, targetUserId);
  }

  @Get('recommend')
  getRecommendations(@Req() req: AuthRequest) {
    return this.friendsService.getRecommendations(req.user.id);
  }
}
