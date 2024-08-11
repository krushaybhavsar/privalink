export function TypographyH1(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-4xl font-bold font-neometric lslg:text-5xl ";
  return (
    <h1 {...props} className={styles + props.className}>
      {props.children}
    </h1>
  );
}

export function TypographyH2(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-3xl font-semibold font-neometric ";
  return (
    <h2 {...props} className={styles + props.className}>
      {props.children}
    </h2>
  );
}

export function TypographyH3(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-2xl font-semibold font-neometric ";
  return (
    <h3 {...props} className={styles + props.className}>
      {props.children}
    </h3>
  );
}

export function TypographyH4(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-xl font-semibold font-neometric ";
  return (
    <h4 {...props} className={styles + props.className}>
      {props.children}
    </h4>
  );
}

export function TypographyH5(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-lg font-semibold font-neometric ";
  return (
    <h5 {...props} className={styles + props.className}>
      {props.children}
    </h5>
  );
}

export function TypographyP(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "leading-7 [&:not(:first-child)]:mt-6 font-neometric ";
  return (
    <p {...props} className={styles + props.className}>
      {props.children}
    </p>
  );
}
