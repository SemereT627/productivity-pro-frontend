import styled from "@emotion/styled";

export const DashboardLogo = () => {
  const LogoWrapper = styled.div`
    background: rgba(255, 255, 255, 0.2);
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const LogoStyled = styled.img`
    width: 100%;
    height: auto;
    max-height: 64px;
    margin: auto;
  `;

  return (
    <LogoWrapper>
      <LogoStyled
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        alt="logo"
      />
    </LogoWrapper>
  );
};
