import { Collapse, Typography } from 'antd'

export const SummarizeCollapse = () => {
  return (
    <Collapse
      defaultActiveKey='1'
      items={[
        {
          key: '1',
          label: 'Summarize',
          children: (
            <Typography.Paragraph>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ligula
                consequat nunc curae lectus nullam enim cras senectus
                condimentum. Est metus quisque finibus, fermentum elit lacus
                class porta. Quisque aenean magna mattis vitae suspendisse
                litora. Tellus iaculis montes nascetur non eget gravida. Conubia
                suscipit ante maecenas per pellentesque. Ultrices metus aenean
                facilisis lectus fringilla. Massa pellentesque euismod aliquam
                purus bibendum lobortis ultricies.
              </p>

              <p>
                Litora felis elementum hendrerit ante vestibulum. Condimentum
                aliquet class ex, proin tellus curae finibus ut. Dictumst
                aliquam quis sociosqu cubilia maximus mus. Molestie dolor
                pellentesque magnis aenean pellentesque nam tellus auctor
                aliquam. Montes himenaeos suscipit arcu duis vehicula duis
                maximus fringilla. Leo placerat ligula magna justo class id
                donec. Etiam rutrum dolor aliquet nulla eros rutrum vivamus.
                Hendrerit ullamcorper nostra vitae mauris pharetra ad nostra leo
                volutpat. Donec sociosqu arcu sodales nullam pharetra
                condimentum senectus auctor.
              </p>
            </Typography.Paragraph>
          ),
        },
      ]}
    />
  )
}
