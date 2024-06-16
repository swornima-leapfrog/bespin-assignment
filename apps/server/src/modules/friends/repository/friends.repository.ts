import { UserRepository } from '@/modules/users/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { process } from 'gremlin';

const { statics } = process;

@Injectable()
export class FriendsRepository {
  constructor(private readonly userRepository: UserRepository) {}

  getAllFriends(currentUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g.V(currentUserId).both('isFriendWith');

    return this.userRepository.execute(traversal);
  }

  async friendRequestExists(currentUserId: number, targetUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const edgeExistsTraversal = g
      .V(currentUserId)
      .outE('sentFriendRequest')
      .where(statics.inV().hasId(targetUserId));

    return this.userRepository.execute(edgeExistsTraversal);
  }

  async sendFriendRequest(currentUserId: number, targetUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g
      .V(currentUserId)
      .as('currentUser')
      .V(targetUserId)
      .as('targetUser')
      .addE('sentFriendRequest')
      .from_('currentUser')
      .to('targetUser');

    return traversal.next();
  }

  getSentRequests(currentUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g.V(currentUserId).out('sentFriendRequest');

    return this.userRepository.execute(traversal);
  }

  getRequests(currentUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g.V(currentUserId).in_('sentFriendRequest');

    return this.userRepository.execute(traversal);
  }

  removeRequest(currentUserId: number, targetUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g
      .V(currentUserId)
      .as('currentUser')
      .inE('sentFriendRequest')
      .as('friendRequestEdge')
      .outV()
      .hasId(targetUserId)
      .select('friendRequestEdge')
      .drop();

    return traversal.next();
  }

  async acceptRequest(currentUserId: number, targetUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g
      .V(currentUserId)
      .as('currentUser')
      .V(targetUserId)
      .as('targetUser')
      .addE('isFriendWith')
      .from_('currentUser')
      .to('targetUser')
      .addE('isFriendWith')
      .from_('targetUser')
      .to('currentUser');

    return traversal.next();
  }

  async recommendFriends(currentUserId: number) {
    const g = this.userRepository.gremlinService.getClient();

    const traversal = g
      .V(currentUserId)
      .as('currentUser')
      .both('isFriendWith')
      .both('isFriendWith')
      .where(statics.not(statics.hasId(currentUserId)))
      .dedup();

    return this.userRepository.execute(traversal);
  }
}
