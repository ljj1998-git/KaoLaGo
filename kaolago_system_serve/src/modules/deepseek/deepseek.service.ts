import { RESPONSE_CODE } from '@/constants/index';
import { UserEntity } from '@/entities/index';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeepseekService {
  constructor(
    @Inject('RESPONSE_CODE')
    private readonly responseCode: typeof RESPONSE_CODE,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}
}
