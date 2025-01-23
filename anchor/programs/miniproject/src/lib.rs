#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod miniproject {
    use super::*;

  pub fn close(_ctx: Context<CloseMiniproject>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.miniproject.count = ctx.accounts.miniproject.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.miniproject.count = ctx.accounts.miniproject.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeMiniproject>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.miniproject.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeMiniproject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Miniproject::INIT_SPACE,
  payer = payer
  )]
  pub miniproject: Account<'info, Miniproject>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseMiniproject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub miniproject: Account<'info, Miniproject>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub miniproject: Account<'info, Miniproject>,
}

#[account]
#[derive(InitSpace)]
pub struct Miniproject {
  count: u8,
}
